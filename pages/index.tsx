import { useState } from 'react';
import ImageCard from '../components/ImageCard';

const IndexPage = () => {
  const [isShowLoadMore, setIsShowLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [noResultModal, setNoResultModal] = useState(false); // State for "No result" modal

  const fetchImages = async (searchQuery: string, page: number) => {
    setPage(page);
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=EkyVzvI4AZA4V3Ir-Ze76PmV2N3xwMCZ6t54N2bskBE&per_page=8&page=${page}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      if (data.results.length === 0) {
        setNoResultModal(true); // Show "No result" modal if no images are found
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
        setIsShowLoadMore(data.results.length > 0);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setPage(1);
      setImages([]);
      fetchImages(query, 1);
    }
  };

  const loadMorePage = () => {
    fetchImages(query, page + 1);
  };

  const openModal = (image: any) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const closeNoResultModal = () => {
    setNoResultModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-center">
      <h1 className="text-3xl font-bold text-center mb-6">Unsplash</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-l px-4 py-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {loading && <div className="text-center text-gray-500">Loading...</div>}
      {error && <div className="text-center text-red-500">Error: {error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} onClick={() => openModal(image)}>
            <ImageCard image={image} />
          </div>
        ))}
      </div>
      {isShowLoadMore && (
        <button
          onClick={loadMorePage}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}

      {/* Modal for Selected Image */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description}
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}

      {/* Modal for No Result */}
      {noResultModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full text-center">
            <p className="text-lg font-semibold text-gray-700">No result found</p>
            <button
              onClick={closeNoResultModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
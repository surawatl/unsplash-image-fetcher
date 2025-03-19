# Unsplash Image Fetcher

This project is a simple Next.js application that fetches images from the Unsplash API and displays them using a custom ImageCard component.

## Features

- Fetches images from the Unsplash API
- Displays images with descriptions and other relevant information
- Responsive design with scoped CSS modules

## Getting Started

To get started with the Unsplash Image Fetcher, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/unsplash-image-fetcher.git
   cd unsplash-image-fetcher
   ```

2. **Install dependencies:**

   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project and add your Unsplash API access key:

   ```
   UNSPLASH_ACCESS_KEY=your_access_key_here
   ```

4. **Run the development server:**

   Start the Next.js development server:

   ```bash
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

The main entry point of the application is located in `pages/index.tsx`. This file fetches images from the Unsplash API and displays them using the `ImageCard` component located in `components/ImageCard.tsx`.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
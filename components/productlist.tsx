import ProductCard from './ProductCard'; // Import the new component

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$5.58',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Headphones',
    href: '#',
    imageSrc: 'https://pngimg.com/d/headphones_PNG101979.png',
    imageAlt: "Seamless sound quality.",
    price: '$16.73',
    color: 'Aspen White',
  },
  {
    id: 3,
    name: 'Speaker',
    href: '#',
    imageSrc: 'https://thumbs.dreamstime.com/b/minsk-belarus-sep-jbl-bluetooth-speaker-isolated-white-background-minsk-belarus-sep-jbl-bluetooth-speaker-isolated-99166900.jpg',
    imageAlt: "Loud bass and blutooth enabled.",
    price: '$27.88',
    color: 'Aspen White',
  },
  {
    id: 4,
    name: 'Laptop',
    href: '#',
    imageSrc: 'https://png.pngtree.com/png-clipart/20240325/original/pngtree-hp-laptop-white-background-png-image_14681338.png',
    imageAlt: "Intel core i7 processor",
    price: '$334.58',
    color: 'Aspen White',
  },
  // ... add the rest of your products here
];

export default function Prod() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Check out the products!</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            // Use the component here
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
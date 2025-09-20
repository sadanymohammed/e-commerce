"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WishlistBtn from "../_components/WishlistBtn/WishlistBtn";
import Image from "next/image";
import AddBtn from "../_components/AddBtn/AddBtn";

export default function ProductsPage() {
  // الحالات
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    sort: "",
    priceGte: "",
    priceLte: "",
    brand: "",
  });
  const [totalPages, setTotalPages] = useState(1);

  // جلب البراندات من الـ API
  const fetchBrands = async () => {
    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      if (!response.ok) throw new Error("Failed to fetch brands");
      const data = await response.json();
      setBrands([{ _id: "", name: "All Brands" }, ...data.data]);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  // جلب المنتجات من الـ API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        limit: filters.limit,
        page: filters.page,
        ...(filters.sort && { sort: filters.sort }),
        ...(filters.priceGte && { "price[gte]": filters.priceGte }),
        ...(filters.priceLte && { "price[lte]": filters.priceLte }),
        ...(filters.brand && { brand: filters.brand }),
      }).toString();

      const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?${queryParams}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.metadata?.numberOfPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // جلب البراندات والمنتجات عند تحميل الكومبوننت
  useEffect(() => {
    fetchBrands();
    fetchProducts();
  }, [filters]);

  // التعامل مع تغيير الفلاتر
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // إعادة ضبط الفلاتر
  const clearFilters = () => {
    setFilters({
      limit: 10,
      page: 1,
      sort: "",
      priceGte: "",
      priceLte: "",
      brand: "",
    });
  };

  // التعامل مع الـ Pagination
  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  // دالة لعرض اسم البراند بناءً على _id
  const getBrandName = (brandId) => {
    const brand = brands.find((b) => b._id === brandId);
    return brand ? brand.name : "No Brand";
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Our Products
      </h1>

      <div className="filters mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg shadow-sm">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            name="priceGte"
            placeholder="Min Price"
            value={filters.priceGte}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            name="priceLte"
            placeholder="Max Price"
            value={filters.priceLte}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Sort By</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="title">Title: A-Z</option>
            <option value="-title">Title: Z-A</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <select
            name="brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-full flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 bg-white ">
                  <Link href={`/products/${product._id}`} key={product._id}>
                    <Image
                      width={500}
                      height={500}
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-md mb-3 cursor-pointer"
                    />
                  </Link>

                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {product.title}
                  </h2>
                  <p className="text-green-600 font-medium">
                    {product.price} EGP
                  </p>
                  <p className="text-sm text-gray-500">
                    {getBrandName(product.brand?._id || product.brand)}
                  </p>
            <div className="flex justify-center mt-4">
                    <AddBtn id={product._id} />
                  <WishlistBtn productId={product._id} />
            </div>

                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>

          <div className="pagination mt-8 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white disabled:opacity-50 transition-colors"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  filters.page === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                } transition-colors`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === totalPages}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

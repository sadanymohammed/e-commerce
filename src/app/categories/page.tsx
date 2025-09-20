"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getCategories() {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      const data = await res.json();
      setCategories(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (loading) return <p className="text-center mt-12">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
      {categories.map((cat) => (
        <Link key={cat._id} href={`/categories/${cat._id}`}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">{cat.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

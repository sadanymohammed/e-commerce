import AllCategories from '@/api/AllCategories'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper';

export default async function CategorySlider() {
  
  let data = await AllCategories()


  
  return (
    <>
    <CategorySwiper data={data} />
    </>
  )
}

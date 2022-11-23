import React from "react";
import CategoryProductCard from "../../Shared/Category Product Card/CategoryProductCard";

const Category = () => {
  return (
    <div>
      <section>
        <div class="relative px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div class="relative mx-auto max-w-7xl">
            <div class="grid max-w-lg gap-5 mx-auto lg:grid-cols-3 lg:max-w-none">
                <CategoryProductCard></CategoryProductCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;

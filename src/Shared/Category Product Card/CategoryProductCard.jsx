import React from 'react';
const CategoryProductCard = () => {
    return (
        <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
          <div class="flex-shrink-0">
            <img class="object-cover w-full h-48" src="https://images.unsplash.com/photo-1561654791-00316c79efa8?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE5fHx8ZW58MHx8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=900&amp;q=60" alt=""/>
          </div>
          <div class="flex flex-col justify-between flex-1 p-6 bg-white">
            <div class="flex-1">
              <a href="#" class="block mt-2">
                <p class="text-xl font-semibold text-neutral-600">Product Name</p>
                <p class="mt-3 text-base text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.</p>
              </a>
            </div>
            <div class="flex items-center mt-6">
              <div class="flex-shrink-0">
                <a href="https://twitter.com/Mike_Andreuzza">
                  <span class="sr-only">Michael Andreuzza</span>
                  <img class="w-10 h-10 rounded-full" src="https://d33wubrfki0l68.cloudfront.net/2f76102fd18a4e095eaed7a836a3f2183a982a4d/91dd4/images/avatar.jpg" alt=""/>
                </a>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-neutral-600">
                  <a href="https://twitter.com/Mike_Andreuzza" class="hover:underline"> Michaerl Andreuzza</a>
                </p>
                <div class="flex space-x-1 text-sm text-gray-500">
                  <time datetime="2020-03-16"> Mar 16, 2020 </time>
                  <span aria-hidden="true"> · </span>
                  <span> 6 min read </span>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CategoryProductCard;
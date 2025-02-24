import React, { useState, useEffect } from "react";

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");

 
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);  
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryFilter = (category) => {
    const filtered = items.filter((item) =>
      category === "All" ? true : item.category === category
    );
    setFilteredItems(filtered);
  };


  const handleSort = (option) => {
    setSortOption(option);
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (option === "name") {
        return a.name.localeCompare(b.name);
      } else if (option === "price") {
        return a.price - b.price;
      }
      return 0;
    });
    setFilteredItems(sortedItems);
  };

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  return (
    <div>
     
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search items..."/>

     
      <select onChange={(e) => handleCategoryFilter(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
      </select>

   
      <select onChange={(e) => handleSort(e.target.value)} value={sortOption}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select>

     
      <div>
        {filteredItems.map((item) => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Price: {item.price}</p>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemList;

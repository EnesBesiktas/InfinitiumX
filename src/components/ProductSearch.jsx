import React, { useState } from 'react';
import { searchProducts } from '../services/api';
import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory

const ProductSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await searchProducts(query);
      setResults(response.data);
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', margin: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Product Search</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products..."
          style={{ width: '300px', padding: '8px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 12px', marginLeft: '10px' }}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results && results.products && (
        <div style={{ marginTop: '20px' }}>
          <h4>Search Results for "{results.query}"</h4>
          <p>{results.total_count} products found.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {results.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;

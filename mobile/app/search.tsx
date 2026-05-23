import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing } from '@/constants/theme';
import { SearchBar } from '@/components/search/SearchBar';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSpinner, EmptyState } from '@/components/ui';
import { getProducts } from '@/services/product-service';
import { Product } from '@/types/product';

export default function SearchScreen() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const debounceRef = React.useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (text.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await getProducts({ search: text, limit: 30 });
        setResults(data);
        setSearched(true);
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setLoading(false);
      }
    }, 400);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          value={query}
          onChangeText={handleSearch}
          onClear={() => handleSearch('')}
          autoFocus
        />
      </View>

      {loading ? (
        <LoadingSpinner />
      ) : searched && results.length === 0 ? (
        <EmptyState icon="magnify-close" title={t('common.noResults')} />
      ) : (
        <FlatList
          data={results}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  grid: {
    padding: Spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
});

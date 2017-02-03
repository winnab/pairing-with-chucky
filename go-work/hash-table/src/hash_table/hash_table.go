package hash_table

import "fmt"

type Pair struct {
	key int
	value string
}

type HashTable struct {
	pairs []Pair
}

func (h *HashTable) Insert(key int, value string) error {
	_, err := h.Lookup(key)
	if err == nil {
		return fmt.Errorf("Key already exists")
	}

	h.pairs = append(h.pairs, Pair{
		key: key,
		value: value,
	})

	return nil
}

func (h *HashTable) Lookup(key int) (string, error) {
	for _, pair := range h.pairs {
		if pair.key == key {
			return pair.value, nil
		}
	}
	return "", fmt.Errorf("Key not found")
}

func (h *HashTable) Keys() []int {
	keys := []int{}
	for _, pair := range h.pairs {
		keys = append(keys, pair.key)
	}
	return keys
}


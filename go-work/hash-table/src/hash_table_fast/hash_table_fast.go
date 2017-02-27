package hash_table_fast

import "fmt"

func NewHashTable(n int) *HashTable {
	ht := HashTable{
		values: make([]string, n, n),
	}

	return &ht
}

type HashTable struct {
	values []string
}

func (h *HashTable) Insert(key int, value string) error {
	if value == "" {
		return fmt.Errorf("Value cannot be empty string")
	}

	myKey := key - 1
	if myKey < 0 || myKey >= len(h.values) {
		return fmt.Errorf("Key out of range")
	}

	_, err := h.Lookup(key) // linear
	if err == nil {
		return fmt.Errorf("Key already exists")
	}

	h.values[myKey] = value

	return nil
}

func (h *HashTable) Lookup(key int) (string, error) {
	myKey := key - 1
	if myKey < 0 || myKey >= len(h.values) {
		return "", fmt.Errorf("Key out of range")
	}

	value := h.values[myKey]
	if value == "" {
		return "", fmt.Errorf("Key not found")
	}

	return value, nil
}

func (h *HashTable) Keys() []int {
	keys := []int{}
	for i, value := range h.values {
		if value != "" {
			keys = append(keys, i+1)
		}
	}
	return keys
}

/*

map (goal)
hashmap


slice / array / string
linked list
tree


char
int
float

*/

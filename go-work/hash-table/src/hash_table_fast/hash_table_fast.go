package hash_table_fast

import (
	"fmt"
)

type pair struct {
	key   int
	value string
}

type bucket struct {
	pairs []pair
}

func (b *bucket) append(key int, value string) {
	updated := append(b.pairs, pair{key: key, value: value})
	b.pairs = updated
}

func (b *bucket) lookup(key int) (string, error) {
	for _, pair := range b.pairs {
		if pair.key == key {
			return pair.value, nil
		}
	}

	return "", fmt.Errorf("Key not found")
}

type HashTable struct {
	len     int
	buckets []*bucket
}

func NewHashTable() *HashTable {
	ht := HashTable{
		buckets: make([]*bucket, 100),
	}

	for i, _ := range ht.buckets {
		ht.buckets[i] = new(bucket)
	}

	return &ht
}

func newHashTable(old *HashTable) *HashTable {
	newHT := HashTable{
		buckets: make([]*bucket, (len(old.buckets) * 4)),
	}

	for i, _ := range newHT.buckets {
		newHT.buckets[i] = new(bucket)
	}

	for _, b := range old.buckets {
		for _, p := range b.pairs {
			newHT.Insert(p.key, p.value)
		}
	}

	return &newHT
}

func (h *HashTable) Insert(key int, value string) error {
	bucket := h.getBucket(key)

	_, err := bucket.lookup(key)
	if err == nil {
		return fmt.Errorf("Key already exists")
	}

	bucket.append(key, value)

	h.len = h.len + 1
	h.resizeIfNecessary()

	return nil
}

func (h *HashTable) Lookup(key int) (string, error) {
	bucket := h.getBucket(key)
	return bucket.lookup(key)
}

func (h *HashTable) Keys() []int {
	keys := []int{}
	for _, bucket := range h.buckets {
		for _, pair := range bucket.pairs {
			keys = append(keys, pair.key)
		}
	}
	return keys
}

func (h *HashTable) getBucketNumber(key int) int {
	return hash(key) % len(h.buckets)
}

func (h *HashTable) getBucket(key int) *bucket {
	bucketNum := h.getBucketNumber(key)
	if bucketNum < 0 {
		panic("Did not expect getBucketNumber to return negative number")
	}
	return h.buckets[bucketNum]
}

func (h *HashTable) resizeIfNecessary() {
	numBuckets := len(h.buckets)
	numKeys := h.len

	if float32(numKeys) > (float32(0.8) * float32(numBuckets)) {
		*h = *newHashTable(h)
	}
}

// based on http://stackoverflow.com/a/12996028
func hash(x int) int {
	x = ((x >> 16) ^ x) * 0x45d9f3b
	x = ((x >> 16) ^ x) * 0x45d9f3b
	x = (x >> 16) ^ x
	return x
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

array = ['ch'.....'wb']
array[0] = 'ch'
array[700] = 'wb'

list = [(100 spaces)]

list.insert(1000, "nb")
list.insert(80, "mm")

1000 % 100 = 0
80 % 100 = 80

n = (n / d) * d + (n % d)
n = q * d + r

8 = 0 * 10 + 8

2342 = 1 * 2304 + r
38

((key + 13) + key[0] ^ key[2]) % n

100 kvp
1000 slots

[........, [(80, "mm"), (1000, "nb")], ......]
*/

package hash_table_test

import (
	"hash_table"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

// TODO

// API:
// Benchmark tests in new measurements file, a la https://onsi.github.io/ginkgo/#benchmark-tests
// Delete value by key

// Properties:
// Key must be unique
// Key must be int
// Values can be any type

var _ = Describe("HashTable", func() {
	var ht hash_table.HashTable

	BeforeEach(func() {
		ht = hash_table.HashTable{}
		Expect(len(ht.Keys())).To(Equal(0))
	})
	Describe("Look up a value by its key", func() {
		It("returns the value", func() {
			_, err := ht.Lookup(123)
			Expect(err).To(HaveOccurred())
		})
	})
	Describe("Insert a key/value pair", func() {
		It("inserts a key and value for keys that do not exist", func() {

			ht.Insert(123, "foobar")
			Expect(len(ht.Keys())).To(Equal(1))

			value, err := ht.Lookup(123)
			Expect(err).NotTo(HaveOccurred())
			Expect(value).To(Equal("foobar"))
		})

		It("returns an error if a duplicate key is inserted", func() {
			ht.Insert(123, "foobar")

			err := ht.Insert(123, "foobar")
			Expect(err).To(HaveOccurred())

		})
	})

	Describe("Getting all keys", func() {
		It("returns an empty slice if there are no keys", func(){
			keys := ht.Keys()
			Expect(keys).To(Equal([]int{}))
		})

		It("gets a list of keys", func() {
			ht.Insert(123, "foobar")
			keys := ht.Keys()
			Expect(keys).To(Equal([]int{123}))
		})
	})
})

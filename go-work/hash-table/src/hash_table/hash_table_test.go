package hash_table_test

import (
	"hash_table"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
	"hash_table_fast"
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
	var ht *hash_table_fast.HashTable

	BeforeEach(func() {
		ht = hash_table_fast.NewHashTable(10000)
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

			err := ht.Insert(123, "foobar")
			Expect(err).NotTo(HaveOccurred())
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
		It("returns an empty slice if there are no keys", func() {
			keys := ht.Keys()
			Expect(keys).To(Equal([]int{}))
		})

		It("gets a list of keys", func() {
			ht.Insert(123, "foobar")
			keys := ht.Keys()
			Expect(keys).To(Equal([]int{123}))
		})
	})

	Measure("insertNPairs", func(b Benchmarker) {
		runtime := b.Time("runtime", func() {
			n := 20000
			ht := insertNPairs(n)
			Expect(len(ht.Keys())).To(Equal(n))
		})
		_ = runtime

		//Expect(runtime.Seconds()).Should(BeNumerically("<", 0.2), "SomethingHard() shouldn't take too long.")

		//b.RecordValue("disk usage (in MB)", HowMuchDiskSpaceDidYouUse())
	}, 10)

	Measure("insertNFast", func(b Benchmarker) {
		runtime := b.Time("runtime", func() {
			n := 20000
			ht := insertNFast(n)
			Expect(len(ht.Keys())).To(Equal(n))
		})
		_ = runtime

		//Expect(runtime.Seconds()).Should(BeNumerically("<", 0.2), "SomethingHard() shouldn't take too long.")

		//b.RecordValue("disk usage (in MB)", HowMuchDiskSpaceDidYouUse())
	}, 10)
})

func insertNPairs(n int) *hash_table.HashTable {
	ht := new(hash_table.HashTable)
	for i := 0; i < n; i++ {
		ht.Insert(i, string(i))
	}
	return ht
}

func insertNFast(n int) *hash_table_fast.HashTable {
	ht := hash_table_fast.NewHashTable(n + 1)
	for i := 1; i < n+1; i++ {
		ht.Insert(i, string(i))
	}
	return ht
}

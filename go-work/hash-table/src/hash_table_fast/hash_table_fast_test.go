package hash_table_fast_test

import (
	"hash_table_fast"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("HashTableFast", func() {
	var ht *hash_table_fast.HashTable

	BeforeEach(func() {
		ht = hash_table_fast.NewHashTable()
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

		It("supports inserting '0' as a key", func() {
			err := ht.Insert(0, "foobar")
			Expect(err).NotTo(HaveOccurred())
			Expect(len(ht.Keys())).To(Equal(1))

			value, err := ht.Lookup(0)
			Expect(err).NotTo(HaveOccurred())
			Expect(value).To(Equal("foobar"))
		})

		It("supports inserting '' as a value", func() {
			err := ht.Insert(123, "")
			Expect(err).NotTo(HaveOccurred())
			Expect(len(ht.Keys())).To(Equal(1))

			value, err := ht.Lookup(123)
			Expect(err).NotTo(HaveOccurred())
			Expect(value).To(Equal(""))
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

	It("can insert a very high key value", func() {
		hugeKey := 1000000000000

		ht.Insert(hugeKey, "wowza")
		Expect(ht.Lookup(hugeKey)).To(Equal("wowza"))
	})

	Measure("insert similar keys", func(b Benchmarker) {
		var (
			ht *hash_table_fast.HashTable
			n  int
		)

		runtime := b.Time("runtime", func() {
			n = 20000
			ht = insertNSimilar(n)
		})

		Expect(len(ht.Keys())).To(Equal(n))
		_ = runtime

		Expect(runtime.Seconds()).Should(BeNumerically("<", 0.2), "SomethingHard() shouldn't take too long.")

		b.RecordValue("run time", runtime.Seconds())
	}, 10)

	Measure("insertNFast", func(b Benchmarker) {
		var (
			ht *hash_table_fast.HashTable
			n  int
		)

		runtime := b.Time("runtime", func() {
			n = 800000
			ht = insertNFast(n)
		})

		Expect(len(ht.Keys())).To(Equal(n))
		_ = runtime

		Expect(runtime.Seconds()).Should(BeNumerically("<", 0.3), "SomethingHard() shouldn't take too long.")

		b.RecordValue("run time", runtime.Seconds())
	}, 10)
})

func insertNSimilar(n int) *hash_table_fast.HashTable {
	ht := hash_table_fast.NewHashTable()
	for i := 1; i < n+1; i++ {
		ht.Insert(i*1000, string(i))
	}
	return ht
}

func insertNFast(n int) *hash_table_fast.HashTable {
	ht := hash_table_fast.NewHashTable()
	for i := 1; i < n+1; i++ {
		ht.Insert(i, string(i))
	}
	return ht
}

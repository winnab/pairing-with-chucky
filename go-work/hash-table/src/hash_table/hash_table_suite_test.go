package hash_table_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"testing"
)

func TestHashTable(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "HashTable Suite")
}

package hash_table_fast_test

import (
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"

	"testing"
)

func TestHashTableFast(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "HashTableFast Suite")
}

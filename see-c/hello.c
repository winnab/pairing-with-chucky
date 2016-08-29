#include <stdio.h>
#include <stdlib.h>

int add(int x, int y);

int main(int intc, char* intv[]) {
  printf("hello world\ngoodbye\n");
  for (int i = 0; i < 10; i++) {
    printf("%d\n", i);
  }

  int a = 5;
  int b = 32;
  printf("sum of %d and %d is %d\n", a, b, add(a, b));

  char c = 'x';
  printf("%c\n", c);

  char* str = "winna is cool";
  printf("%s %s\n", str, str);

  int arr[] = {3, 7, 9};
  int arr2[3];
  arr2[0] = 3;
  arr2[1] = 7;
  arr2[2] = 9;

  for (int i = 0; i < 3; i++) {
    printf("%d =?= %d\n", arr[i], arr2[i]);
  }

  void* p = malloc(1000);
  int* d_array = (int*)p;
  d_array[0] = 3;
  d_array[1] = 7;
  d_array[2] = 9;
  for (int i = 0; i < 3; i++) {
    printf("%d =?= %d\n", arr[i], d_array[i]);
  }


/*
  signed/unsigned char
  short int
  int
  long int
  long long int

  float
  double
*/

  unsigned long long int sum = 0;

  // for (unsigned long long i = 0; i < 10000000000L; i++) {
  //   //for (unsigned long long i = 0; i < 10000000; i++) {
  //     sum = intc ^ sum;
  //   //}
  // }
  printf("%llu\n", sum);

  char myString[3] = "foo";
  //myString[3] = 'b';
  printf("%s\n", myString);
  // return 7;
  //asdf
}

int add(int x, int y) {
  return x + y;
}

#include <stdio.h>
void swap(int* x, int* y);

int main(void) {
  // int a[] = {5, 7, 9, 11};
  int x = 0;
  int y = 5;
  int z = 3;
  printf("%p\n", &x);
  printf("%p\n", &y);
  printf("%p\n", &z);

  //swap(&x, &y);
  //typeof(&(type)) == pointer to type

  printf("%d\n", x);
  printf("%d\n", y);
  printf("%d\n", z);

  swap(&x, &z);

  printf("%d\n", x);
  printf("%d\n", y);
  printf("%d\n", z);

  // printf("%p\n", &a[0]);
  // printf("%p\n", &a[1]);

  // int* pone = &a[0];
  // int* ptwo = &a[1];

  // printf("*pone = %d\n", *pone);
  // //(pone + 1)
  // *pone = 13;

  // *(pone+1) = 15;

  // for (int i = 0; i < 4; i++) {
  //   printf("%d\n", a[i]);
  // }
}

void swap(int* x, int* y) {
  int a = *x;
  int b = *y;

  *x = b;
  *y = a;
}

// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a, b, c, d, e, f, 10
// 0, 1, 10, 11, 100, 101, 110, 111, 1000
// 10010101

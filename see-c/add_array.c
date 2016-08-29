#include <stdio.h>
#include <stdlib.h>

int sum(int array[], int array_size);
void print_array(int array[], int array_size);
char* concat_strings(char* string1, char* string2);

int main(int intc, char* intv[]) {
  int array_length = intc - 1;
  int* array1 = malloc(array_length * sizeof(int));
  for(int i = 0; i < array_length; i++) {
    char* string_to_convert = intv[i + 1];
    int converted = atoi(string_to_convert);
    array1[i] = converted;
  }
  // print_array(array1, array_length);

  //int array1[] = {1,2,3,4,5,6,7,8,9};
  // int the_sum = sum(array1, array_length);
  // printf("the sum is %d\n", the_sum);

  // [ 'x', 'y', 'z', 0] ['a', 'b', 'c', 0]

  char* string1 = "hello";
  char* string2 = "world";

  printf("concatenated is %s\n", concat_strings(string1, string2));

  free(array1);
}

char* concat_strings(char* string1, char* string2) {
  char *concatenated = malloc(1000);
  int i = 0;
  while(string1[i] != 0) {
    // string1[]
    concatenated[i] = string1[i];
    i++;
  }
  // printf("%s\n", concatenated);

  int j = 0;
  while(string2[j] != 0) {
    // string1[]
    concatenated[i +j] = string2[j];
    j++;
  }
  concatenated[i + j] = 0;

  // int j

  return concatenated;
}

int sum(int array[], int array_size) {
  int sum = 0;
  for(int i = 0; i < array_size; i++) {
    sum += array[i];
  }
  return sum;
}

void print_array(int array[], int array_size) {
  printf("numbers are: ");
  for(int i = 0; i < array_size; i++) {
    printf("%d ", i);
  }
  printf("\n");
}

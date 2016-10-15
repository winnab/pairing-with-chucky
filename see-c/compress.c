#include <stdio.h>
#include <stdlib.h>

void compress_batch_v0(char* batch, int length, FILE* dest);
void compress_batch_v1(char* batch, int length, FILE* dest);
void write_encoding(int times_repeated, char previous, FILE* dest);

static const int BATCH_SIZE = 10000;

void check_args(FILE* input, FILE* output) {
  if (input == NULL) {
    printf("Source file not found.");
    exit(1);
  }

  if (output == NULL) {
    printf("Destination file not found.");
    exit(1);
  }
}

int main(int argv, char** argc) {
  if (argv != 3) {
    printf("Need file name to continue");
    return 1;
  }

  char* file_to_read = argc[1];
  char* file_to_write = argc[2];

  FILE *fp_read = fopen(file_to_read, "rb");
  FILE *fp_write = fopen(file_to_write, "wb");

  check_args(fp_read, fp_write);

  char b[BATCH_SIZE];

  size_t numread = 0;

  //int done;
  do {
    numread = fread(b, sizeof(b[0]), BATCH_SIZE, fp_read);
    compress_batch_v1(b, numread, fp_write);
  } while (numread == BATCH_SIZE);

  // do {
  //   numread = fread(b, sizeof(b[0]), BATCH_SIZE, fp_read);
  //   fwrite(b, sizeof(b[0]), numread, fp_write);
  // } while(numread == BATCH_SIZE);
}
void compress_batch_v0(char* batch, int length, FILE* dest) {
  fwrite(batch, sizeof(batch[0]), length, dest);
}
void compress_batch_v1(char* batch, int length, FILE* dest) {
  // length greater than 1
  printf("%d\n", length);
  int times_repeated = 1;
  char previous = batch[0];
  for(int i = 1; i < length; i++) {
    char current = batch[i];
    if(previous == current) {
      if (times_repeated == 255) {
        write_encoding(times_repeated, previous, dest);
        times_repeated = 1;  
      } else {
        times_repeated ++;
      }
    } else {
      write_encoding(times_repeated, previous, dest);
      times_repeated = 1;
    }

    previous = current;
  }
  write_encoding(times_repeated, previous, dest);
}

void write_encoding(int times_repeated, char previous, FILE* dest) {
  // printf("%d%c", times_repeated, previous);
  char *encoded = malloc(BATCH_SIZE * 2 + 1);

  // if (times_repeated == 1) {
  //   int encoded_length = sprintf(encoded, "%c", previous);
  //   fwrite(encoded, sizeof(encoded[0]), encoded_length, dest);
  // } else {
    int encoded_length = sprintf(encoded, "%c%c", times_repeated, previous);
    fwrite(encoded, sizeof(encoded[0]), encoded_length, dest);
  //}
}

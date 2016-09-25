#include <stdio.h>

void printBits(unsigned char c);
// unsigned char reverseBits(unsigned char c);
unsigned char invertBits(unsigned char c);

int main(void) {
  // char* s = "hello world";
  // char sy[12] = "hello world";
  printBits(189);

  printBits(189);
  unsigned char reversed = invertBits(189);
  printBits(reversed);

}


void printBits(unsigned char c) {

  for (int i = 0; i < 8; i++) {
    int oneAtPosition = 1 << (7 - i);
    int currentBit = c & oneAtPosition;
    printf("%d", currentBit >> (7 - i));
  }
  printf("\n");
  // int secondBit = c & 2; // 2d = 10b
  // printf("%d", secondBit >> 1);
  // int rightmostBit = c & 1;
  // printf("%d", rightmostBit);
  // int secondBit = c & 2; // 2d = 10b
  // printf("%d", secondBit / 2);
  // int rightmostBit = c & 1;
  // printf("%d", rightmostBit);
}

// unsigned char reverseBits(unsigned char c) {

// }

unsigned char invertBits(unsigned char c) {
  //printBits(c);
  unsigned char inverted = 0;
  for (int i = 0; i < 8; i++) {
    int oneAtPosition = 1 << (7 - i);
    //printBits(oneAtPosition);
    int currentBit = c & oneAtPosition;
    //printBits(currentBit);
    int invertedBit = currentBit >> (7 - i);

    if (invertedBit == 0) {
      invertedBit = 1;
    } else {
      invertedBit = 0;
    }
    int correctBitAndPosition = invertedBit << (7 - i);

    inverted = inverted | correctBitAndPosition;

  }

  return inverted;
}

// x1x2x3 & y1y2y3 = (x1&y1) (x2&y2) (x3&y3)
// 100 & 110 = 100

// abcdefgh & 10000000 == a0000000
//...
// abcdefgh & 00000010 == 000000g0
// abcdefgh & 00000001 == 0000000h

//abcd0fgh _ 0000x000 = abcdxfgh

  //printf("%f\n", 1.0/3.0);




//   104 101 108 108 111 032 119 111 114 108 100 013 010 000

//   base-10 104 = (4 * 10^0) + 0 * 10^1 + 1 * 10^2

//   base-2 01101000 = (0 * 2^0) + (0 * 2^1) + 0 * 2^2 + 1 * 2^3 + 0 * 2^4 + 1 * 2^5 + 1 * 2^6 + 0 * 2^7
//   = 8 + 32 + 64
//   = 104


//   01010100101010101010110101010001001010101010010101010100010101101010101010101010010101010100101


//   int x = 37502;
//   int y = 7;

//   int x[50000]

//   01 char        11111111
//   02 "short"     1000100010001000
//   04 "int"       10001000100010001000100010001000
//   08 "longlong"  1000100010001000100010001000100010001000100010001000100010001000

//   decimal xxx
//   binary bbb

// // unsigned mapping
//   00000000b 0d
//   00000001b 1d
//   00000010b 2d
//   ...
//   11111111b 255d

//   // signed mapping
//   00000000b 0d
//   00000001b 1d
//   00000010b 2d
//   ...
//   10000000
//   11111111b 255d
//   biggest number in n spaces = 10^n - 1; 2^n - 1


// 00000111
//   //s[8]
//   char myChar = 37;
//   // char must be 1 byte
// ax, bx, cx

// add ax, bx
// add ax, bx, cx

// 5000001
// 501000102

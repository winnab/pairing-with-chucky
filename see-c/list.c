#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
  int data;
  struct Node* next;
} Node;

void print_node(struct Node *node);
void print_list(struct Node *node);
struct Node* prepend(struct Node *node, int data);
struct Node* append(struct Node *node, int data);

void print_list_concrete(struct Node *node);
void print_list_generic_iterative(struct Node *node);
void print_list_generic_recursive(struct Node *node);

int main(void) {
  struct Node *node2 = prepend(NULL, 2);
  struct Node *node1 = prepend(node2, 1);
  struct Node *node0 = prepend(node1, 0);
  struct Node *node00 = append(node0, 3);
  print_list(node00);

  node00->next = NULL;

  struct Node *nodeNew = append(NULL, 4);
  printf("%d\n", nodeNew->data);
  print_list(nodeNew);
  print_list_generic_recursive(nodeNew);

  //Struct Node mynode = {data=5};
}

struct Node* prepend(struct Node *node, int data) {
  struct Node *head = malloc(sizeof(struct Node));
  head->data = data;
  head->next = node;
  return head;
}

struct Node* append(struct Node *node, int data) {
  struct Node *last = malloc(sizeof(struct Node));
  last->data = data;
  last->next = NULL;

  if (node == NULL) {
    return last;
  }

  struct Node *current = node;
  while (current->next != NULL) {
    current = current->next;
  }

  current->next = last;

  return node;

}

void print_list(struct Node *node) {
  if (node == NULL) {
    printf("(empty)\n");
    return;
  }

  printf("%d",node->data);
  struct Node *current_node = node->next;

  while (current_node != NULL) {
    printf(" -> %d",current_node->data);
    current_node = current_node->next;
  }

  printf("\n");
}

void print_list_generic_iterative(struct Node *node) {
  if (node == NULL) {
    printf("(empty)\n");
    return;
  }
  printf("[{\n");

  struct Node *current_node = node;
  do {
    print_node(current_node);
    printf("}, {\n");
    current_node = current_node->next;
  } while (current_node != NULL);
  printf("}]\n");
}

void print_list_generic_recursive_aux(struct Node *node) {
  if (node->next == NULL) {
    print_node(node);
  } else {
    print_node(node);
    printf("}, {\n");
    print_list_generic_recursive_aux(node->next);
  }
}

void print_list_generic_recursive(struct Node *node) {
  if (node == NULL) {
    printf("(empty)\n");
    return;
  }

  printf("[{\n");
  print_list_generic_recursive_aux(node);
  printf("}]\n");
}

void print_list_concrete(struct Node *node) {
  printf("[{\n");

  print_node(node);

  printf("}, {\n");



  struct Node *node2 = node->next;
  print_node(node2);

  printf("}, {\n");

  struct Node *node3 = node2->next;
  print_node(node3);

  printf("}]\n");
}

void print_node(struct Node *node) {
  printf("data: %d,\n", node->data);
  printf("next: %p\n",  node->next);
}

/*
1 -> 2 -> 3 -> 4
[{
  data: something,
  next: something
},{
  data: something,
  next: something
},{
  data: something,
  next: something
}]

*/

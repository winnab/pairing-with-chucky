	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 10
	.globl	_main
	.align	4, 0x90
_main:                                  ## @main
	.cfi_startproc
## BB#0:                                ## %.preheader515
	pushq	%rbp
Ltmp0:
	.cfi_def_cfa_offset 16
Ltmp1:
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
Ltmp2:
	.cfi_def_cfa_register %rbp
	pushq	%r15
	pushq	%r14
	pushq	%rbx
	pushq	%rax
Ltmp3:
	.cfi_offset %rbx, -40
Ltmp4:
	.cfi_offset %r14, -32
Ltmp5:
	.cfi_offset %r15, -24
	movl	%edi, %r14d
	leaq	L_str(%rip), %rdi
	callq	_puts
	leaq	L_.str1(%rip), %r15
	xorl	%ebx, %ebx
	xorl	%esi, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$1, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$2, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$3, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$4, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$5, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$6, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$7, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$8, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$9, %esi
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	leaq	L_.str2(%rip), %rdi
	movl	$5, %esi
	movl	$32, %edx
	movl	$37, %ecx
	xorl	%eax, %eax
	callq	_printf
	leaq	L_.str3(%rip), %rdi
	movl	$120, %esi
	xorl	%eax, %eax
	callq	_printf
	leaq	L_.str5(%rip), %rdi
	leaq	L_.str4(%rip), %rsi
	xorl	%eax, %eax
	movq	%rsi, %rdx
	callq	_printf
	leaq	L_.str6(%rip), %r15
	movl	$3, %esi
	movl	$3, %edx
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$7, %esi
	movl	$7, %edx
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$9, %esi
	movl	$9, %edx
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$3, %esi
	movl	$3, %edx
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$7, %esi
	movl	$7, %edx
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movl	$9, %esi
	movl	$9, %edx
	xorl	%eax, %eax
	movq	%r15, %rdi
	callq	_printf
	movslq	%r14d, %rax
	movd	%rax, %xmm0
	pshufd	$68, %xmm0, %xmm0       ## xmm0 = xmm0[0,1,0,1]
	xorl	%esi, %esi
	.align	4, 0x90
LBB0_1:                                 ## %overflow.checked
                                        ## =>This Loop Header: Depth=1
                                        ##     Child Loop BB0_2 Depth 2
	movd	%rsi, %xmm1
	movl	$10000000, %eax         ## imm = 0x989680
	.align	4, 0x90
LBB0_2:                                 ## %vector.body
                                        ##   Parent Loop BB0_1 Depth=1
                                        ## =>  This Inner Loop Header: Depth=2
	addq	$-32, %rax
	jne	LBB0_2
## BB#3:                                ## %middle.block
                                        ##   in Loop: Header=BB0_1 Depth=1
	pxor	%xmm0, %xmm1
	pxor	%xmm0, %xmm1
	pshufd	$78, %xmm1, %xmm2       ## xmm2 = xmm1[2,3,0,1]
	pxor	%xmm1, %xmm2
	movd	%xmm2, %rsi
	incq	%rbx
	cmpq	$10000000, %rbx         ## imm = 0x989680
	jne	LBB0_1
## BB#4:
	leaq	L_.str7(%rip), %rdi
	xorl	%eax, %eax
	callq	_printf
	xorl	%eax, %eax
	addq	$8, %rsp
	popq	%rbx
	popq	%r14
	popq	%r15
	popq	%rbp
	retq
	.cfi_endproc

	.globl	_add
	.align	4, 0x90
_add:                                   ## @add
	.cfi_startproc
## BB#0:
	pushq	%rbp
Ltmp6:
	.cfi_def_cfa_offset 16
Ltmp7:
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
Ltmp8:
	.cfi_def_cfa_register %rbp
	addl	%esi, %edi
	movl	%edi, %eax
	popq	%rbp
	retq
	.cfi_endproc

	.section	__TEXT,__cstring,cstring_literals
L_.str1:                                ## @.str1
	.asciz	"%d\n"

L_.str2:                                ## @.str2
	.asciz	"sum of %d and %d is %d\n"

L_.str3:                                ## @.str3
	.asciz	"%c\n"

L_.str4:                                ## @.str4
	.asciz	"winna is cool"

L_.str5:                                ## @.str5
	.asciz	"%s %s\n"

L_.str6:                                ## @.str6
	.asciz	"%d =?= %d\n"

L_.str7:                                ## @.str7
	.asciz	"%llu\n"

	.align	4                       ## @str
L_str:
	.asciz	"hello world\ngoodbye"


.subsections_via_symbols

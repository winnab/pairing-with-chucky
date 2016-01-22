# ruby LExp.ruby | node -i

class LExp
end

class LExpVariable < LExp
  # LExp -> Variable
  attr_reader :variable

  def initialize variable
    @variable = variable
  end
end

class LExpApplication < LExp
  # LExp -> LExp LExp
  attr_reader :left, :right

  def initialize left, right
    @left = left
    @right = right
  end

  def to_s
    "(#{@left} #{@right})"
  end

  def to_js
    "(#{@left.to_js})(#{@right.to_js})"
  end
end

class LExpBinding < LExp
  # LExp -> λVariable.LExp
  attr_reader :binding_variable, :body

  def initialize binding_variable, body
    @binding_variable = binding_variable
    @body = body
  end

  def to_s
    # (λx.(x x))
    "(λ#{@binding_variable}.#{@body})"
  end

  def to_js
    "function(#{@binding_variable.to_js}) { return #{@body.to_js} }"
  end
end

class Variable
  attr_reader :name

  def initialize name
    @name = name
  end

  def to_s
    @name
  end

  def to_js
    self.to_s
  end

  def collect_variables
  end
end

# (\x.(x x))
x = Variable.new("x")

# puts "Variable: #{x}"

left_body = LExpApplication.new(x, x)
left_binding = LExpBinding.new(x, left_body)

# (\y.(y y))
y = Variable.new("y")
right_body = LExpApplication.new(y, y)
right_binding = LExpBinding.new(y, right_body)

# puts "Binding: #{right_binding}"

omega = LExpApplication.new(left_binding, right_binding)

# puts "Application: #{omega}"


#============================================

# (\x.(x x))(\x. (x x))
x = Variable.new("x")
left_body = LExpApplication.new(x, x)
left_binding = LExpBinding.new(x, left_body)

omega2 = LExpApplication.new(left_binding, left_binding)


puts "var #{x} = function(#{x}) {return #{x}};"
puts "#{LExpApplication.new(x, x).to_js}.toString()"

# lambda calculus interpreter:
#input: x x
#output: x x

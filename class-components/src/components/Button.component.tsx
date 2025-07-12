import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

class Button extends React.Component<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props);
  }
  static defaultProps = {
    onClick: () => alert('Button clicked!'),
    children: 'Click Me',
  };

  render() {
    const { children } = this.props;
    return (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={this.props.onClick}
      >
        {children}
      </button>
    );
  }
}
export default Button;

import React, { ReactNode, Children } from 'react';

export type ShowProps = {
  /**
   * sets the component children.
   */
  children?: ReactNode;
};

export const Show = (props: ShowProps): ReactNode => {
  let when: ReactNode = null;
  let otherwise: ReactNode = null;

  Children.forEach(props.children, (child) => {
    if (
      typeof child !== 'string' &&
      React.isValidElement(child) &&
      'isTrue' in child.props
    ) {
      if (child.props.isTrue) {
        when = child;
      }
    } else {
      otherwise = child;
    }
  });

  return when || otherwise;
};

Show.When = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: ReactNode;
}): ReactNode => {
  return isTrue ? children : null;
};

Show.Else = ({
  render,
  children,
}: {
  render?: ReactNode;
  children: ReactNode;
}): ReactNode => {
  return render || children;
};

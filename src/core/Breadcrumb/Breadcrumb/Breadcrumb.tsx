import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HtmlLi, HtmlNav, HtmlNavProps, HtmlOl } from '../../../reset';
import { baseStyles } from './Breadcrumb.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';

const baseClassName = 'fi-breadcrumb';
const listClassName = `${baseClassName}_list`;
const itemClassName = `${baseClassName}_item`;

export interface BreadcrumbProps extends HtmlNavProps, MarginProps {
  /** Labels the breadcrumb for screen reader users */
  'aria-label': string;
  /** CSS class for custom styles */
  className?: string;
  /**
   * Use `<BreadcrumbLink>` elements as children
   */
  children?: ReactNode;
}

const breadcrumbItems = (children: ReactNode) =>
  React.Children.map(children, (child) => (
    <HtmlLi className={itemClassName}>{child}</HtmlLi>
  ));

class BaseBreadcrumb extends Component<BreadcrumbProps & SuomifiThemeProp> {
  render() {
    const { className, theme, children, ...rest } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

    return (
      <HtmlNav
        {...passProps}
        className={classnames(baseClassName, className)}
        style={{ ...marginStyle, ...passProps?.style }}
      >
        <HtmlOl className={listClassName}>{breadcrumbItems(children)}</HtmlOl>
      </HtmlNav>
    );
  }
}

const StyledBreadcrumb = styled(BaseBreadcrumb)`
  ${({ theme }) => baseStyles(theme)}
`;

const Breadcrumb = (props: BreadcrumbProps) => {
  const { 'aria-label': ariaLabel, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledBreadcrumb
          theme={suomifiTheme}
          {...passProps}
          {...getConditionalAriaProp('aria-label', [ariaLabel])}
        />
      )}
    </SuomifiThemeConsumer>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
export { Breadcrumb };

'use client';

import React from 'react';
import { Pressable, View, Text } from 'react-native';
import { createCheckbox } from '@gluestack-ui/core/checkbox/creator';
import { UIIcon } from '@gluestack-ui/core/icon/creator';
import { tva } from '@gluestack-ui/utils/nativewind-utils';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { withUniwind } from 'uniwind';

const StyledIcon = withUniwind(UIIcon);

const UICheckbox = createCheckbox({
  Root: Pressable,
  Label: Text,
  Icon: StyledIcon,
  Indicator: View,
  Group: View,
});

const checkboxStyle = tva({
  base: 'flex-row items-center justify-start gap-2 data-[disabled=true]:opacity-40',
});

const checkboxGroupStyle = tva({
  base: 'gap-2',
});

const checkboxIndicatorStyle = tva({
  base: 'items-center justify-center border border-border rounded bg-background data-[checked=true]:bg-primary data-[checked=true]:border-primary data-[hover=true]:border-primary/80 data-[invalid=true]:border-destructive data-[disabled=true]:opacity-40',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
});

const checkboxLabelStyle = tva({
  base: 'text-foreground data-[disabled=true]:opacity-40',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
});

const checkboxIconStyle = tva({
  base: 'text-primary-foreground fill-none',
  parentVariants: {
    size: {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    },
  },
});

type ICheckboxProps = VariantProps<typeof checkboxStyle> &
  React.ComponentProps<typeof UICheckbox> & { className?: string };

const Checkbox = React.forwardRef<React.ComponentRef<typeof UICheckbox>, ICheckboxProps>(
  function Checkbox({ className, ...props }, ref) {
    return <UICheckbox className={checkboxStyle({ class: className })} ref={ref} {...props} />;
  }
);

type ICheckboxGroupProps = VariantProps<typeof checkboxGroupStyle> &
  React.ComponentProps<typeof UICheckbox.Group> & { className?: string };

const CheckboxGroup = React.forwardRef<
  React.ComponentRef<typeof UICheckbox.Group>,
  ICheckboxGroupProps
>(function CheckboxGroup({ className, ...props }, ref) {
  return (
    <UICheckbox.Group className={checkboxGroupStyle({ class: className })} ref={ref} {...props} />
  );
});

type ICheckboxIndicatorProps = VariantProps<typeof checkboxIndicatorStyle> &
  React.ComponentProps<typeof UICheckbox.Indicator> & { className?: string };

const CheckboxIndicator = React.forwardRef<
  React.ComponentRef<typeof UICheckbox.Indicator>,
  ICheckboxIndicatorProps
>(function CheckboxIndicator({ className, size = 'md', ...props }, ref) {
  return (
    <UICheckbox.Indicator
      className={checkboxIndicatorStyle({ class: className, size })}
      ref={ref}
      {...props}
    />
  );
});

type ICheckboxLabelProps = VariantProps<typeof checkboxLabelStyle> &
  React.ComponentProps<typeof UICheckbox.Label> & { className?: string };

const CheckboxLabel = React.forwardRef<
  React.ComponentRef<typeof UICheckbox.Label>,
  ICheckboxLabelProps
>(function CheckboxLabel({ className, size = 'md', ...props }, ref) {
  return (
    <UICheckbox.Label
      className={checkboxLabelStyle({ class: className, size })}
      ref={ref}
      {...props}
    />
  );
});

type ICheckboxIconProps = VariantProps<typeof checkboxIconStyle> &
  React.ComponentProps<typeof UICheckbox.Icon> & { className?: string };

const CheckboxIcon = React.forwardRef<
  React.ComponentRef<typeof UICheckbox.Icon>,
  ICheckboxIconProps
>(function CheckboxIcon({ className, size = 'md', ...props }, ref) {
  return (
    <UICheckbox.Icon
      className={checkboxIconStyle({ class: className, parentVariants: { size } })}
      ref={ref}
      {...props}
    />
  );
});

Checkbox.displayName = 'Checkbox';
CheckboxGroup.displayName = 'CheckboxGroup';
CheckboxIndicator.displayName = 'CheckboxIndicator';
CheckboxLabel.displayName = 'CheckboxLabel';
CheckboxIcon.displayName = 'CheckboxIcon';

export { Checkbox, CheckboxGroup, CheckboxIndicator, CheckboxLabel, CheckboxIcon };

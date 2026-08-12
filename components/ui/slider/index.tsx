'use client';

import React from 'react';
import { Pressable, View } from 'react-native';
import { createSlider } from '@gluestack-ui/core/slider/creator';
import { tva, useStyleContext, withStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { withUniwind } from 'uniwind';

const SCOPE = 'SLIDER';
const Root = withStyleContext(View, SCOPE);

export const UISlider = createSlider({
  Root,
  Thumb: View,
  Track: Pressable,
  FilledTrack: View,
  ThumbInteraction: View,
});

const StyledTrack = withUniwind(UISlider.Track);

const sliderStyle = tva({
  base: 'justify-center items-center data-[disabled=true]:opacity-40',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
  },
});

const sliderThumbStyle = tva({
  base: 'bg-background border-2 border-primary absolute rounded-full shadow-sm h-5 w-5',
});

const sliderTrackStyle = tva({
  base: 'bg-muted rounded-full overflow-hidden',
  parentVariants: {
    orientation: {
      horizontal: 'w-full h-1.5 flex-row',
      vertical: 'h-full w-1.5 flex-col-reverse',
    },
  },
});

const sliderFilledTrackStyle = tva({
  base: 'bg-primary',
  parentVariants: {
    orientation: {
      horizontal: 'h-full',
      vertical: 'w-full',
    },
  },
});

type ISliderProps = React.ComponentProps<typeof UISlider> & VariantProps<typeof sliderStyle>;

const Slider = React.forwardRef<React.ComponentRef<typeof UISlider>, ISliderProps>(function Slider(
  { className, orientation = 'horizontal', ...props },
  ref
) {
  return (
    <UISlider
      ref={ref}
      orientation={orientation}
      {...props}
      className={sliderStyle({ orientation, class: className })}
      context={{ orientation }}
    />
  );
});

type ISliderThumbProps = React.ComponentProps<typeof UISlider.Thumb> &
  VariantProps<typeof sliderThumbStyle>;

const SliderThumb = React.forwardRef<React.ComponentRef<typeof UISlider.Thumb>, ISliderThumbProps>(
  function SliderThumb({ className, ...props }, ref) {
    return (
      <UISlider.Thumb ref={ref} {...props} className={sliderThumbStyle({ class: className })} />
    );
  }
);

type ISliderTrackProps = React.ComponentProps<typeof UISlider.Track> &
  VariantProps<typeof sliderTrackStyle>;

const SliderTrack = React.forwardRef<React.ComponentRef<typeof UISlider.Track>, ISliderTrackProps>(
  function SliderTrack({ className, ...props }, ref) {
    const { orientation: parentOrientation } = useStyleContext(SCOPE);

    return (
      <StyledTrack
        hitSlop={20}
        ref={ref}
        {...props}
        className={sliderTrackStyle({
          parentVariants: { orientation: parentOrientation },
          class: className,
        })}
      />
    );
  }
);

type ISliderFilledTrackProps = React.ComponentProps<typeof UISlider.FilledTrack> &
  VariantProps<typeof sliderFilledTrackStyle>;

const SliderFilledTrack = React.forwardRef<
  React.ComponentRef<typeof UISlider.FilledTrack>,
  ISliderFilledTrackProps
>(function SliderFilledTrack({ className, ...props }, ref) {
  const { orientation: parentOrientation } = useStyleContext(SCOPE);

  return (
    <UISlider.FilledTrack
      ref={ref}
      {...props}
      className={sliderFilledTrackStyle({
        parentVariants: { orientation: parentOrientation },
        class: className,
      })}
    />
  );
});

export { Slider, SliderFilledTrack, SliderThumb, SliderTrack };

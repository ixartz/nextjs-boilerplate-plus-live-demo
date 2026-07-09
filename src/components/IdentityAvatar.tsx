import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AVATAR_BACKGROUND_COLORS, cn, hashStringToIndex } from '@/utils/Helpers';

const identityAvatarVariants = cva('', {
  variants: {
    size: {
      default: '',
      lg: 'size-12',
    },
    shape: {
      circle: '',
      square: 'rounded-sm',
    },
  },
  defaultVariants: {
    size: 'default',
    shape: 'circle',
  },
});

/**
 * Displays an avatar with initials and a deterministic background color based on the primary label.
 * @param props The component props.
 * @param props.className Optional. Custom CSS classes.
 * @param props.primaryLabel The primary text displayed in the avatar label. This value is used to generate the avatar's initials and determine its background color.
 * @param props.secondaryLabel Optional. Secondary text shown beneath the primary text.
 * @param props.size Optional. Size variant of the avatar.
 * @param props.shape Optional. Shape variant of the avatar.
 */
export const IdentityAvatar = (props: {
  className?: string;
  primaryLabel: string;
  secondaryLabel?: string;
} & VariantProps<typeof identityAvatarVariants>) => {
  const initials = props.primaryLabel.substring(0, 2).toUpperCase();
  const colorIndex = hashStringToIndex(props.primaryLabel);
  const backgroundColor = AVATAR_BACKGROUND_COLORS[colorIndex % AVATAR_BACKGROUND_COLORS.length];

  return (
    <div className="flex min-w-0 items-center gap-2">
      <Avatar
        className={cn(identityAvatarVariants({ size: props.size, shape: props.shape }), props.className)}
      >
        <AvatarFallback className={
          cn('text-xs font-bold text-white', backgroundColor, {
            'rounded-sm': props.shape === 'square',
            'text-lg': props.size === 'lg',
          })
        }
        >
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-col">
        <span
          className={cn('truncate font-medium', {
            'text-sm': (props.size ?? 'default') === 'default',
            'text-base': props.size === 'lg',
          })}
          title={props.primaryLabel}
        >
          {props.primaryLabel}
        </span>

        {props.secondaryLabel && (
          <span
            className={cn('truncate text-muted-foreground', {
              'text-xs': (props.size ?? 'default') === 'default',
              'text-sm': props.size === 'lg',
            })}
            title={props.secondaryLabel}
          >
            {props.secondaryLabel}
          </span>
        )}
      </div>
    </div>
  );
};

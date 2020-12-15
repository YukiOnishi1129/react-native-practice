import React from 'react';

/**
 * カスタムフック
 * @param initialValue
 */
export default function useControlledComponent<T>(initialValue: T) {
  const [value, setValue] = React.useState(initialValue);

  const onChangeText = (newValue: T) => {
    setValue(newValue);
  };

  return {
    value,
    onChangeText,
  };
}

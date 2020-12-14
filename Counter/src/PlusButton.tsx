import React from 'react';
import Button from './components/Button';

interface Props {
  count: number;
  setCounter: (count: number) => void;
}

export default function PlusButton(props: Props) {
  const {count, setCounter} = props;
  const addCounter = React.useCallback(() => {
    setCounter(count + 1);
  }, [count, setCounter]);

  return <Button label="+" onPress={addCounter} />;
}

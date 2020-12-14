import React from 'react';
import Button from './components/Button';

interface Props {
  count: number;
  setCounter: (count: number) => void;
}

export default function ReduceButton(props: Props) {
  const {count, setCounter} = props;
  const reduceCounter = React.useCallback(() => {
    setCounter(count - 1);
  }, [count, setCounter]);

  return <Button label="-" disabled={count <= 0} onPress={reduceCounter} />;
}

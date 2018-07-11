
import React from 'react';
import type { TextType } from './dux';

import styles from './styles.css';

const Text = ({ text }: TextType) => (
  <div>
    <div className={styles.text}>
      {text.text}
    </div>
  </div>
);

export default Text;

// flow
import React from 'react';
import { Message, MESSAGE } from './index';
import type MomentType from './dux';

type MomentPropType = {
  data: MomentType,
}

const Moment = ({data}:MomentPropType) => {
  switch (data.type) {
  case MESSAGE:
    return (
      <Message
        message={data}
      />
    );
  }
};

export default Moment;
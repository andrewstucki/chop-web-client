import React from 'react';
import Responsive from 'react-responsive';

const Small = React.memo(props => <Responsive {...props} maxWidth={639} />);
Small.displayName = 'Small';

const Medium = React.memo(props => <Responsive {...props} minWidth={640} maxWidth={767} />);
Medium.displayName = 'Medium';

const MediumDown = React.memo(props => <Responsive {...props} maxWidth={767} />);
MediumDown.displayName = 'MediumDown';

const MediumUp = React.memo(props => <Responsive {...props} minWidth={640} />);
MediumUp.displayName = 'MediumUp';

const Large = React.memo(props => <Responsive {...props} minWidth={768} maxWidth={1199} />);
Large.displayName = 'Large';

const LargeDown = React.memo(props => <Responsive {...props} maxWidth={1199} />);
LargeDown.displayName = 'LargeDown';

const LargeUp = React.memo(props => <Responsive {...props} minWidth={768} />);
LargeUp.displayName = 'LargeUp';

const Xlarge = React.memo(props => <Responsive {...props} minWidth={1200} />);
Xlarge.displayName = 'Xlarge';

export {
  Small,
  Medium,
  MediumDown,
  MediumUp,
  Large,
  LargeDown,
  LargeUp,
  Xlarge,
};

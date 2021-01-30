import Button from './../components/_common_/Button';

const defaultButton = {};

const Story = (props) => {
    console.log(props);
    return <Button {...props} />;
};

export default {
    title: 'Components/Button',
    component: Button,
};

export const Default = Story.bind();

Default.args = {};

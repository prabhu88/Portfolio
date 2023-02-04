import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import {
    Card, CardHeader, CardMedia, CardContent, CardActions,
    Collapse, Avatar, IconButton, Typography, Container
} from '@material-ui/core/';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LMS from './complete.png'

import './_projects.scss'
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const Projects = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <Container className="Project_container">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            L
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="Office Management System (LMS)"
                    subheader="PHP,AngularJS,Mysql and etc..."
                />
                <CardMedia
                    sx={{
                        height: 0,
                        paddingTop: '56.25%', // 16:9
                    }}
                    image={LMS}
                    title="STVAT (LMS)"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        LMS is a comprehensive Office Management Solution for Law and Audit Firms.                        
                        My role in the project as (Leader)- Full Stack Developer.<br/>
                        My Team Size - 5 - and we completed this project in 5 Months
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Brief Details:</Typography>
                        <Typography paragraph>
                            ....
                        </Typography>
                        <Typography paragraph>
                            .....
                        </Typography>
                        <Typography paragraph>
                            .....
                        </Typography>
                        <Typography>
                            ....
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            E-I
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title="GST B2B/B2C E-Invoice tool For 247"
                    subheader="React,MaterialDesign UI,Node JS and etc.."
                />
                <CardMedia
                    sx={{
                        height: 0,
                        paddingTop: '56.25%', // 16:9
                    }}
                    image={LMS}
                    title="STVAT (LMS)"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        LMS is a comprehensive Office Management Solution for Law and Audit Firms.                        
                        My role in the project as (Leader)- Full Stack Developer.<br/>
                        My Team Size - 5 - and we completed this project in 5 Months
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>Brief Details:</Typography>
                        <Typography paragraph>
                            ....
                        </Typography>
                        <Typography paragraph>
                            .....
                        </Typography>
                        <Typography paragraph>
                            .....
                        </Typography>
                        <Typography>
                            ....
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Container>

    )
}

export default Projects;
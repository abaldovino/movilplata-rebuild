import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CobroImage from '../assets/cobro.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
    backgroundSize:'contain'
  },
  contentTitle: {
    textAlign: 'center'
  }
});

const handleClick = () => {
  console.log('clic')
}

function CardPos(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.root} onClick={props.movilAction}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={CobroImage}
          title="Contemplative Reptile" />
        <CardContent className={classes.contentTitle}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.contentTitle}>
            {props.subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

CardPos.propTypes = {

}

export default CardPos


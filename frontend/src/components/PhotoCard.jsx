import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const PhotoCard = ({ image, alt }) => {
  return (
    <Card sx={{ maxWidth: 345 }} className="m-4 relative cursor-pointer text-left">
      <CardActionArea>
        {image && (
          <CardMedia
            component="img"
            height="140"
            image={`data:image/png;base64,${image}`}
            alt={alt}
            className="border-2 border-gray-400 w-40 h-40 object-cover mb-2 mx-auto"
          />
        )}
      </CardActionArea>
    </Card>
  );
};

export default PhotoCard;

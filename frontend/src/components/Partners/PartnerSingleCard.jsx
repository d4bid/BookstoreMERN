import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const PartnerSingleCard = ({ partner, isAdmin = false, onOpenModal }) => {

  return (
    <Card sx={{ maxWidth: 345 }} className="m-4 relative cursor-pointer text-left" onClick={() => onOpenModal(partner)}>
      <CardActionArea>
        {partner.image && (
          <CardMedia
            component="img"
            height="140"
            image={`data:image/png;base64,${partner.image}`}
            alt={partner.name}
            className="border-2 border-gray-400 w-40 h-40 object-cover mb-2 mx-auto"
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" className="font-bold">
            {partner.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="font-semibold">
            {partner.contact}
          </Typography>
          <Typography variant="body2" color="text.secondary" className="italic">
            {partner.address}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PartnerSingleCard;

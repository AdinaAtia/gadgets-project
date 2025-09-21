import { useEffect, useState } from "react";
import Axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const { data } = await Axios.get(`http://localhost:7002/api/reviews/${productId}`);
      setReviews(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleAddReview = async () => {
    try {
      const { data } = await Axios.post("http://localhost:7002/api/reviews", {
        productId,
        user,
        rating,
        comment
      });
      setReviews([...reviews, data]);
      setUser("");
      setRating(5);
      setComment("");
      setOpen(false); // סוגר את המודל אחרי הוספה
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333', fontFamily: 'Arial, sans-serif' }}>ביקורות:</Typography>

      {reviews.length > 0 ? (
        reviews.map((rev) => (
          <Card key={rev._id} sx={{ mb: 2, p: 1, bgcolor: '#f9f9f9', borderRadius: 2, boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{rev.user}</Typography>
                <Rating value={rev.rating} readOnly size="small" />
              </Box>
              <Typography variant="body2" sx={{ color: '#555' }}>{rev.comment}</Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography sx={{ color: '#777' }}>אין ביקורות עדיין.</Typography>
      )}

      <Button variant="contained"  sx={{
    bgcolor: "#FFD500", // צבע הרקע הראשי
    color: "#333",      // צבע הטקסט
    fontWeight: "bold",
    '&:hover': {
      bgcolor: "#FFC107", // צבע הרקע כשעומדים על הכפתור
      color: "#333",      // צבע הטקסט לא משתנה
    }
  }} onClick={() => setOpen(true)}>
        הוסף ביקורת
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>הוספת ביקורת</DialogTitle>
        <DialogContent>
          <TextField
            label="שם"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Typography sx={{ mr: 2 }}>דירוג:</Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
          </Box>
          <TextField
            label="ביקורת"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button  sx={{
    bgcolor: "#FFD500", // צבע הרקע הראשי
    color: "#333",      // צבע הטקסט
    fontWeight: "bold",
    '&:hover': {
      bgcolor: "#FFC107", // צבע הרקע כשעומדים על הכפתור
      color: "#333",      // צבע הטקסט לא משתנה
    }
  }} onClick={() => setOpen(false)}>ביטול</Button>
          <Button variant="contained"  sx={{
    bgcolor: "#FFD500", // צבע הרקע הראשי
    color: "#333",      // צבע הטקסט
    fontWeight: "bold",
    '&:hover': {
      bgcolor: "#FFC107", // צבע הרקע כשעומדים על הכפתור
      color: "#333",      // צבע הטקסט לא משתנה
    }
  }} onClick={handleAddReview}>
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductReviews;

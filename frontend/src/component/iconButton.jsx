import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function MyIcon() {
  return (
    <Grid container sx={{ color: "text.primary" }}>
      <Grid item xs={4}>
        <Typography>Filled</Typography>
      </Grid>
      <Grid item xs={8}>
        <DeleteIcon />
        <DeleteForeverIcon />
      </Grid>
    </Grid>
  );
}

export default MyIcon;

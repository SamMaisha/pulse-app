import React from "react";
import { Box, Snackbar } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const QuickLinksItem = ({handleCopyLink, name, url}) => {
  return(
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <h3>{name}</h3>
          </Box>
          <Box sx={{ flex: 2 }}>
            <input type="text" value={url} readOnly style={{ width: '120%', borderRadius: '5px' }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FileCopyIcon
              sx={{ color: 'white', cursor: 'pointer', marginLeft: '50%' }}
              onClick={() => handleCopyLink(url)}
            />
          </Box>
        </Box>
  )
}

export default QuickLinksItem;
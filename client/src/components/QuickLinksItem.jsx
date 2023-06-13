import React from "react";
import { Box } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const QuickLinksItem = ({ quickLink, handleCopyLink, handleEditLink, handleDeleteLink }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flex: 1 }}>
        <h3>{quickLink.name}</h3>
      </Box>
      <Box sx={{ flex: 2 }}>
        <input type="text" value={quickLink.url} readOnly style={{ width: '120%', borderRadius: '5px' }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <FileCopyIcon
          sx={{ color: 'white', cursor: 'pointer', marginLeft: '50%' }}
          onClick={() => handleCopyLink(quickLink.url)}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <EditIcon
          sx={{ color: 'white', cursor: 'pointer', marginLeft: '50%' }}
          onClick={() => handleEditLink(quickLink.url)}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <DeleteIcon
          sx={{ color: 'white', cursor: 'pointer', marginLeft: '50%' }}
          onClick={() => handleDeleteLink(quickLink.id)}
        />
      </Box>
    </Box>
  )
}

export default QuickLinksItem;
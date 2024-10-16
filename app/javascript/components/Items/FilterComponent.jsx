import React, { useState } from "react";
import {
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput,
  Box,
  Typography,
} from "@mui/material";

import { useQuery } from "react-query";
import { TAGS_QUERY_KEY } from "../../utils/constants";
import { ApiClient } from "../../services";

const FilterComponent = ({ onFilter }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [sellerId, setSellerId] = useState("");

  //   const tags = ['Finance', 'Economy', 'Technology', 'Health', 'Investment'];

  const { data: tags = [] } = useQuery(
    TAGS_QUERY_KEY,
    ApiClient.fetchEbooksTags,
    {
      onSuccess: (data) => {
        console.log("Tags fetched successfully:", data);
      },
    }
  );

  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };

  const handleFilter = () => {
    onFilter({ tags: selectedTags, seller_id: sellerId });
  };

  return (
    <div className="flex flex-row justify-center items-center gap-4 mt-8 mb-16">
      <FormControl variant="outlined" className="w-32">
        <TextField
          id="seller-id"
          variant="outlined"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          label="Seller Id"
        />
      </FormControl>

      <FormControl variant="outlined" className="flex-1 max-w-sm">
        <InputLabel id="tags-label">Tags</InputLabel>
        <Select
          labelId="tags-label"
          multiple
          value={selectedTags}
          onChange={handleTagChange}
          input={<OutlinedInput label="Tags" />}
          renderValue={(selected) => {
            const maxVisible = 3;
            const visibleTags = selected.slice(0, maxVisible);
            const remainingCount = selected.length - maxVisible;

            return (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 0.5, mt: 1 }}>
                <ul className="flex flex-wrap">
                  {visibleTags.map((tag, index) => (
                    <li
                      key={index}
                      className="mr-2 mb-2 bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                  {remainingCount > 0 && (
                    <li className="text-gray-500">+{remainingCount} more</li>
                  )}
                </ul>
              </Box>
            );
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                maxWidth: 200,
              },
            },
          }}
        >
          {tags.map((tag, index) => (
            <MenuItem key={index} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
        onClick={handleFilter}
      >
        Filter
      </button>
    </div>
  );
};

export default FilterComponent;

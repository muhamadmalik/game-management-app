import query from '../db/db.js';
const getAllDevelopers = async () => {
  try {
    const result = await query(
      `SELECT developers.id, developers.name AS name, developers.bio, COUNT(games.name) AS games_developed, STRING_AGG(games.name, ', ') AS games FROM developers LEFT JOIN games ON developers.id = games.developer_id GROUP BY games.developer_id, developers.name, developers.bio, developers.id`
    );
    return result.rows;
  } catch (error) {
    console.error('Error querying the developers,', error);
    throw error;
  }
};
export const getTotalDevelopers = async () => {
  try {
    const result = await query('SELECT COUNT(*) FROM developers');
    return result.rows[0].count;
  } catch (error) {
    console.error('Error querying the developers,', error);
    throw error;
  }
};

export const addDeveloper = async (name, bio) => {
  try {
    const values = [name, bio];
    const result = await query(
      `INSERT INTO developers (name, bio) VALUES ($1, $2)`,
      values
    );
    console.log('Developer Added Successfully!');
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

export const getDeveloper = async (id) => {
  const values = [id];
  try {
    const result = await query(
      `SELECT developers.name AS name, STRING_AGG(games.name, ', ') AS games, developers.bio AS bio  FROM developers LEFT JOIN games ON developers.id = games.developer_id WHERE developers.id = $1 GROUP BY developers.id `,
      values
    );
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

export const removeDeveloper = async (id) => {
  const values = [id];
  try {
    const result = await query(`DELETE FROM developers WHERE id = $1`, values);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};
export default getAllDevelopers;

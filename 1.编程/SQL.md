# SQL

## 一、查询

### 1.1. JOIN

- 笛卡尔积

  两个集合 *X* 和 *Y* 的所有可能的有序对组成的集合，为笛卡儿积。
  
  ```sql
  SELECT
  	* 
  FROM
  	( SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 ) AS digit
  	JOIN ( SELECT 'a' UNION ALL SELECT 'b' UNION ALL SELECT 'c' ) AS letter;
  ```
  
- INNER JOIN

  INNER JOIN 在没有连接条件的情况下，在指定的表之间产生笛卡尔积（即，第一个表中的每一行都连接到第二个表中的每一行）。


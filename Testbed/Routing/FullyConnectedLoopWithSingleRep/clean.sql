delete from t_routing where to_node like 'Test-FCL-%'
delete from t_routing where from_node like 'Test-FCL-%'
delete from t_routing where gateway like 'Test-FCL-%'
delete from t_agent_status where node like 'Test-FCL-%'
delete from t_node_neighbour where node like 'Test-FCL-%'
delete from t_node where name like 'Test-FCL-%'

create or replace function candidate_bcast(_user_id uuid, _lat float, _lng float, _tag text[])
returns setof record --bcast
language sql
as $$
    select *
    from (
        select *,
        -- st_astext converts location in readable text
        st_astext(location) as location, 
        (st_distance(location, st_point(_lng, _lat)::geography) / 1000) as distance_km
        from public.bcast
    ) as subquery
    -- filtering distance
    where distance_km < subquery.max_distance_km
    -- filtering tag
    and subquery.tag && _tag
    -- filtering bcast that are not being already joined, hided or reported
    and subquery.id not in (
        select bcast_id from bcast_user bu
            where bu.user_id = _user_id
            and (
                bu.joined = true
                or bu.hided = true
                or bu.reported = true
            ) 
    );
$$;
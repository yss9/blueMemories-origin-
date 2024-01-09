package com.ragtag.BlueMemories.repository;

import com.ragtag.BlueMemories.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
